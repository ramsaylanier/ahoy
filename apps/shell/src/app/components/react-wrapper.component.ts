import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { init, loadRemote } from "@module-federation/enhanced/runtime";

@Component({
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: "app-root",
  template: "<react-frontend></react-frontend>",
})
export class ReactWrapperComponent {
  title = "wc-ng-shell";
}
