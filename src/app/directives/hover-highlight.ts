import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHoverHighlight]',
  standalone: true,
})
export class HoverHighlight {

  @Input() appHoverHighlight = '';

  constructor(private el: ElementRef) { 

    
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHoverHighlight || 'yellow'); 
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.background = color;
  }
}
