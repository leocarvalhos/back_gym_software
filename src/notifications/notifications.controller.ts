import { Controller, Get, Param, Patch } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('notifyReceptionists')
  notifyReceptionists() {
    return this.notificationsService.notifyReceptionists();
  }
  @Get('checkStudentsWithoutTraining')
  checkStudentsWithoutTraining() {
    return this.notificationsService.checkStudentsWithoutTraining();
  }
  @Get('checkStudentsSession')
  checkStudentsSession() {
    return this.notificationsService.checkStudentsSession();
  }

  @Get('read/:id')
  notificationsByInstructorRead(@Param('id') id: string) {
    return this.notificationsService.notificationsByInstructorRead(id);
  }
  @Get('noRead/:id')
  notificationsByInstructorUnRead(@Param('id') id: string) {
    return this.notificationsService.notificationsByInstructorUnRead(id);
  }

  @Patch('oneRead/:id')
  updateOneRead(@Param('id') id: string) {
    return this.notificationsService.updateOneRead(id);
  }
}
