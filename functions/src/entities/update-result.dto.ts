import { ApiProperty } from "@nestjs/swagger";

export class UpdateResultDto {
    @ApiProperty({type: Object})
    raw: any;
    /**
     * Number of affected rows/documents
     * Not all drivers support this
     */
     @ApiProperty({required: false})
    affected?: number;
    /**
     * Contains inserted entity id.
     * Has entity-like structure (not just column database name and values).
     */
    /**
     * Generated values returned by a database.
     * Has entity-like structure (not just column database name and values).
     */
     @ApiProperty({isArray:true, type: Object})
    generatedMaps: any[];
}