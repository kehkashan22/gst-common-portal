import { RoundPipe } from './round.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSizePipe } from './file-size.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    RoundPipe,
    FileSizePipe
],
  exports: [RoundPipe]
})
export class PipesModule {}
