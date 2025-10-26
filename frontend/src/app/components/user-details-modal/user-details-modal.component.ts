import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details-modal.component.html',
  styleUrls: ['./user-details-modal.component.scss'],
})
export class UserDetailsModalComponent {
  @Input() user: any;
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
  @Output() action = new EventEmitter<{ type: string; userId: string }>();

  emitAction(type: string) {
    if (this.user?.userId) {
      console.log('📤 Emitting action:', type, 'for user:', this.user.userId);
      this.action.emit({ type, userId: this.user.userId });
    } else {
      console.warn('⚠️ No userId found in modal');
    }
  }
}
