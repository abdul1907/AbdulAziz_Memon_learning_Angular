import { Pipe, PipeTransform } from '@angular/core';
import { TideNode } from '../Models/tidenode.interface';

@Pipe({
  name: 'taskDescription',
  standalone: true
})
export class TaskDescriptionPipe implements PipeTransform {

  transform(value: TideNode): string {

    return `${value.taskDescription} (${value.category})`;
  }
}
