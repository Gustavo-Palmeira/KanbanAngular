import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './views/about/about.component';
import { KanbanComponent } from './views/kanban/kanban.component';

const routes: Routes = [
  { path: 'sobre', component: AboutComponent },
  { path: 'kanban', component: KanbanComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
