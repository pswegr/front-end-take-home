import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/message-bar-demo.page/message-bar-demo.page').then(m => m.MessageBarDemoPage)
  }
];
