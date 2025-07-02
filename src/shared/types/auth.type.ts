import type { CurrentUser } from "../../schemas/current-user.schema";
import type { AuthStatus } from "./auth-status.type";

export interface Auth {
  currentUser: CurrentUser | null;
  authStatus: AuthStatus;
}
