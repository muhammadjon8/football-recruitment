import { currentUserSchema } from "../../schemas/current-user.schema";
import { getCookie } from "./cookie-helper.util";

export function getLocalUser() {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");

  if (!accessToken || !refreshToken) {
    return null;
  }

  const localUser = { accessToken, refreshToken };
  const validationResult = currentUserSchema.safeParse(localUser);

  if (!validationResult.success) {
    return null;
  }

  return validationResult.data;
}
