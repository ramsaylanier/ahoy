#!/bin/sh

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install dependencies for a service
install_dependencies() {
    service_name=$1
    service_path=$2
    
    print_status "Installing dependencies for $service_name..."
    
    if [ -d "$service_path" ]; then
        cd "$service_path"
        
        # Check if package.json exists
        if [ ! -f "package.json" ]; then
            print_warning "No package.json found in $service_path"
            return 1
        fi
        
        # Install dependencies
        if command_exists npm; then
            npm install
            if [ $? -eq 0 ]; then
                print_success "Dependencies installed for $service_name"
            else
                print_error "Failed to install dependencies for $service_name"
                return 1
            fi
        else
            print_error "npm not found. Please install Node.js and npm."
            return 1
        fi
        
        cd - > /dev/null
    else
        print_warning "Directory $service_path does not exist"
        return 1
    fi
}

# Function to start a service
start_service() {
    service_name=$1
    service_path=$2
    port=$3
    
    print_status "Starting $service_name on port $port..."
    
    if [ -d "$service_path" ]; then
        cd "$service_path"
        
        # Check if package.json exists
        if [ ! -f "package.json" ]; then
            print_warning "No package.json found in $service_path"
            return 1
        fi
        
        # Check if dev script exists
        if ! grep -q '"dev"' package.json; then
            print_warning "No 'dev' script found in $service_path/package.json"
            return 1
        fi
        
        # Start the service in background
        npm run dev &
        pid=$!
        
        # Wait a moment for the service to start
        sleep 3
        
        # Check if the service is running
        if kill -0 $pid 2>/dev/null; then
            print_success "$service_name started successfully (PID: $pid)"
            echo $pid > "/tmp/${service_name}.pid"
        else
            print_error "Failed to start $service_name"
            return 1
        fi
        
        cd - > /dev/null
    else
        print_warning "Directory $service_path does not exist"
        return 1
    fi
}

# Function to stop all services
stop_services() {
    print_status "Stopping all services..."
    
    # Stop backend
    if [ -f "/tmp/backend.pid" ]; then
        backend_pid=$(cat /tmp/backend.pid)
        if kill -0 $backend_pid 2>/dev/null; then
            kill $backend_pid
            print_success "Backend stopped"
        fi
        rm -f /tmp/backend.pid
    fi
    
    # Stop frontend
    if [ -f "/tmp/frontend.pid" ]; then
        frontend_pid=$(cat /tmp/frontend.pid)
        if kill -0 $frontend_pid 2>/dev/null; then
            kill $frontend_pid
            print_success "Frontend stopped"
        fi
        rm -f /tmp/frontend.pid
    fi
}

# Function to show service status
show_status() {
    print_status "Service Status:"
    
    # Check backend
    if [ -f "/tmp/backend.pid" ]; then
        backend_pid=$(cat /tmp/backend.pid)
        if kill -0 $backend_pid 2>/dev/null; then
            print_success "Backend: Running (PID: $backend_pid)"
        else
            print_error "Backend: Not running (stale PID file)"
        fi
    else
        print_warning "Backend: Not running"
    fi
    
    # Check frontend
    if [ -f "/tmp/frontend.pid" ]; then
        frontend_pid=$(cat /tmp/frontend.pid)
        if kill -0 $frontend_pid 2>/dev/null; then
            print_success "Frontend: Running (PID: $frontend_pid)"
        else
            print_error "Frontend: Not running (stale PID file)"
        fi
    else
        print_warning "Frontend: Not running"
    fi
}

# Main execution
main() {
    print_status "Starting Ahoy Projects Development Environment"
    
    # Set up signal handlers for graceful shutdown
    trap 'print_status "Received interrupt signal. Stopping services..."; stop_services; exit 0' INT TERM
    
    # Install dependencies for both services
    install_dependencies "Backend" "/app/backend"
    install_dependencies "Frontend" "/app/frontend"
    
    # Start services
    start_service "Backend" "/app/backend" "3002"
    start_service "Frontend" "/app/frontend" "3001"
    
    print_success "All services started successfully!"
    print_status "Services are running:"
    print_status "  - Backend: http://localhost:3002"
    print_status "  - Frontend: http://localhost:3001"
    print_status ""
    print_status "Press Ctrl+C to stop all services"
    
    # Wait for interrupt signal
    wait
}

# Handle command line arguments
case "${1:-}" in
    "stop")
        stop_services
        ;;
    "status")
        show_status
        ;;
    "install")
        install_dependencies "Backend" "/app/backend"
        install_dependencies "Frontend" "/app/frontend"
        ;;
    "backend")
        install_dependencies "Backend" "/app/backend"
        start_service "Backend" "/app/backend" "3002"
        wait
        ;;
    "frontend")
        install_dependencies "Frontend" "/app/frontend"
        start_service "Frontend" "/app/frontend" "3001"
        wait
        ;;
    "help"|"-h"|"--help")
        echo "Usage: $0 [command]"
        echo ""
        echo "Commands:"
        echo "  (no args)  Start both backend and frontend services"
        echo "  backend    Start only the backend service"
        echo "  frontend   Start only the frontend service"
        echo "  install    Install dependencies for both services"
        echo "  stop       Stop all running services"
        echo "  status     Show status of running services"
        echo "  help       Show this help message"
        ;;
    *)
        main
        ;;
esac 