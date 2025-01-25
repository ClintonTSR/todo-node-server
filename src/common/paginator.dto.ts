import { Transform } from "class-transformer";
import { IsIn, IsNumber, IsOptional } from "class-validator";
import { PagingQuery } from "typeorm-cursor-pagination";

export class PagingQueryDto implements PagingQuery {
    @IsOptional()
    afterCursor?: string;
    
    @IsOptional()
    beforeCursor?: string;

    @IsOptional()
    @Transform(({ value }) => {
        return Number(value);
      })
    limit?: number;
    
    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    order?: 'ASC' | 'DESC';
    
}