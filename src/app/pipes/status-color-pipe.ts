import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColor',
  standalone: true
})
export class StatusColorPipe implements PipeTransform {

  transform(status: 'active' | 'completed' | 'deferred' | 'cancelled'): string {
    switch (status) {
      case 'active':
        return 'green';
      case 'completed':
        return 'blue';
      case 'deferred':
        return 'yellow';
      case 'cancelled':
        return 'black';
    }
    return 'black';
  }
}
