import { SetMetadata } from '@nestjs/common';

export const PublicKey = 'Public';

export const Public = () => SetMetadata(PublicKey, true);