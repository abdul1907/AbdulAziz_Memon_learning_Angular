import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShowDetailsOnHover]',
  standalone: true,
})
export class ShowDetailsOnHover {

  @Input() appShowDetailsOnHover = '';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  private tooltipElement: HTMLElement | null = null;

  @HostListener('mouseenter') onMouseEnter() {
    if(this.appShowDetailsOnHover) {
      this.showTooltip();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
    }

  private showTooltip() {
    this.tooltipElement = this.renderer.createElement('div');
    const text = this.renderer.createText(this.appShowDetailsOnHover);
    this.renderer.appendChild(this.tooltipElement, text);

     this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
     this.renderer.setStyle(this.tooltipElement, 'background-color', '#333');
     this.renderer.setStyle(this.tooltipElement, 'color', '#fff');
     this.renderer.setStyle(this.tooltipElement, 'padding', '12px 16px');
     this.renderer.setStyle(this.tooltipElement, 'border-radius', '6px');
     this.renderer.setStyle(this.tooltipElement, 'font-size', '13px');
     this.renderer.setStyle(this.tooltipElement, 'z-index', '10000');
     this.renderer.setStyle(this.tooltipElement, 'pointer-events', 'none');
     this.renderer.setStyle(this.tooltipElement, 'max-width', '350px');
     this.renderer.setStyle(this.tooltipElement, 'min-width', '250px');
     this.renderer.setStyle(this.tooltipElement, 'box-shadow', '0 4px 12px rgba(0,0,0,0.3)');
     this.renderer.setStyle(this.tooltipElement, 'line-height', '1.6');
     this.renderer.setStyle(this.tooltipElement, 'white-space', 'normal');
     this.renderer.setStyle(this.tooltipElement, 'word-wrap', 'break-word');

     this.renderer.appendChild(document.body, this.tooltipElement);

     this.positionTooltip();
  }

  private positionTooltip() {
    if (!this.tooltipElement) return;

   
    const rect = this.el.nativeElement;
    let top = 0;
    let left = 0;
    
    
    let element = rect;
    while (element) {
      top += element.offsetTop || 0;
      left += element.offsetLeft || 0;
      element = element.offsetParent;
    }
    
   
    const elementWidth = rect.offsetWidth;
    
    
    const screenWidth = window.innerWidth;
    const tooltipWidth = 300;
    
    
    let tooltipLeft = left + elementWidth + 15;
    
    
    if (tooltipLeft + tooltipWidth > screenWidth) {
      tooltipLeft = left - tooltipWidth - 15;
    }
    
    
    const tooltipTop = top;

    
    this.renderer.setStyle(this.tooltipElement, 'top', `${tooltipTop}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${tooltipLeft}px`);
  }

  private hideTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}