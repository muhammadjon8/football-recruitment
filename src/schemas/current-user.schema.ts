import { z } from "zod";
import { isValidJWT } from "zod/v4/core";

export const currentUserSchema = z.object({
  accessToken: z.string().refine((token) => isValidJWT(token)),
  refreshToken: z.string().refine((token) => isValidJWT(token)),
});

export type CurrentUser = z.infer<typeof currentUserSchema>;
