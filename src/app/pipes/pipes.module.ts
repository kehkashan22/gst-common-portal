import { RoundPipe } from './round.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSizePipe } from './file-size.pipe';
import { TitleCasePipe } from './title-case.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    RoundPipe,
    FileSizePipe,
    TitleCasePipe
],
  exports: [RoundPipe]
})
export class PipesModule {}
