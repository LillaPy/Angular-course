import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'icon',
    template: `
                  <i class="fas fa-{{name}}" [ngClass]="optionalClasses" aria-hidden="true"></i>
              `,
    styles:   []
})
export class IconComponent implements OnInit {
    @Input() name: string;

    // Optional
    @Input() title      ?: string;
    @Input() size       ?: string;
    @Input() fixed      ?: boolean;
    @Input() animation  ?: string;
    @Input() rotate     ?: string | number;
    @Input() inverse    ?: boolean;

    private _optionalClasses: string[] = [];

    constructor() {
    }

    ngOnInit() {
        if (!this.name) {
            throw new Error("Missing \"name\" property for Angular Font Awesome component");
        }

        if (this.size) {
            this.addToOptionalClasses(`fa-${this.size}`);
        }

        if (this.fixed) {
            this.addToOptionalClasses(`fa-fw`);
        }

        if (this.animation) {
            this.addToOptionalClasses(`fa-${this.animation}`);
        }

        if (this.rotate) {
            let rotateClass = (typeof this.rotate === "number") ? `fa-rotate-${this.rotate}`
                : `fa-flip-${this.rotate}`;
            this.addToOptionalClasses(rotateClass);
        }

        if (this.inverse) {
            this.addToOptionalClasses(`fa-inverse`);
        }
    }

    get optionalClasses() {
        return this._optionalClasses;
    }

    private addToOptionalClasses(addClass: string): void {
        this._optionalClasses.push(addClass);
    }
}
