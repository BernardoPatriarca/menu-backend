import { Body, Controller, Get, Param, ParseEnumPipe, ParseUUIDPipe, Patch, Post, Query } from "@nestjs/common";
import { GuestCheckService } from "./guest-check.service";
import { GuestCheck, GuestCheckStatus } from "./guest-check.entity";
import { CreateGuestCheckDTO } from "./dto/create-guest-check.dto";


@Controller('guest-checks')
export class GuestCheckController {

  constructor(
    private readonly service: GuestCheckService
  ){}

  @Get()
  findAll(
    @Query('status', new ParseEnumPipe(GuestCheckStatus, { optional: true }))
    status?: GuestCheckStatus
  ): Promise<GuestCheck[]> {
    return this.service.findAll(status);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe)
    id: string
  ) : Promise<GuestCheck> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateGuestCheckDTO): Promise<GuestCheck> {
    return this.service.create(dto);
  }

  @Patch(':id/close')
  close(
    @Param('id', ParseUUIDPipe)
    id: string): Promise<GuestCheck> {
    return this.service.close(id);
  }
}