import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class RecordDto {
    @ApiProperty({required:false})
    id?: string;
}