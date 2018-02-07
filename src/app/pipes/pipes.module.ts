import { RoundPipe } from './round.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [RoundPipe],
  exports: [RoundPipe]
})
export class PipesModule {}
