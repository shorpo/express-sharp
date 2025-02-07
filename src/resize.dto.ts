/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-magic-numbers */
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator'
import 'reflect-metadata'
import { GravityEnum } from 'sharp'
import { ToBoolean, ToNumber } from './decorators'
import { format } from './interfaces'
import { IsUrl } from './validator/is-url'

export class ResizeDto {
  constructor(args: Partial<ResizeDto>) {
    Object.assign(this, args)
  }

  @IsOptional()
  @IsIn(['heif', 'jpeg', 'jpg', 'png', 'raw', 'tiff', 'webp'])
  @IsString()
  public format?: format

  @ToNumber()
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsInt()
  @Min(1)
  @Max(10_000)
  public height?: number

  @ToNumber()
  @IsNumber()
  @Min(1)
  @Max(10_000)
  public width: number = 500

  @ToNumber()
  @IsInt()
  @Min(0)
  @Max(100)
  public quality: number = 80

  @ToBoolean()
  @IsBoolean()
  public progressive: boolean = false

  @ToBoolean()
  @IsBoolean()
  public crop: boolean = false

  @ToBoolean()
  @IsBoolean()
  public trim: boolean = false

  @IsIn([
    'north',
    'northeast',
    'southeast',
    'south',
    'southwest',
    'west',
    'northwest',
    'east',
    'center',
    'centre',
  ])
  @IsOptional()
  public gravity?: keyof GravityEnum

  @IsUrl({ message: 'Invalid image url' })
  public url?: string
}
