import { NgModule } from '@angular/core';
import { AccordionComponent } from './accordion/accordion';
import { IonicPageModule } from '../../node_modules/ionic-angular/umd';
@NgModule({
	declarations: [AccordionComponent],
	imports: [IonicPageModule.forChild(AccordionComponent)],
	exports: [AccordionComponent]
})
export class ComponentsModule {}
