import { Prisma } from '@prisma/client';
import { Request } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';

export type RequestWithParams = Request & { params: { [key: string]: string; }; };
export type OnlyAuthorMetaData = [boolean?, OnlyAuthorPostGetterQuery?];
export type OnlyAuthorPostGetterQuery = (request: RequestWithParams) => Prisma.PostWhereUniqueInput;

//

export const OnlyAuthorKey = 'OnlyAuthor';

/**
 * This decorator adds metadata to route controller class or methods to enable `OnlyAuthorGaurd` restrict processing of 
 * request to only the Author of the requested post
 * @param postQueryGetter a function that returns a query object used for finding the requested post
 */
export const OnlyAuthor = (postQueryGetter: OnlyAuthorPostGetterQuery) => {
  return SetMetadata(OnlyAuthorKey, [true, postQueryGetter]);
};