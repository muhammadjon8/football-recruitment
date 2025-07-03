import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { TeamRegisterSchema } from "../../../schemas/team.schema";

const useRegisterTeam = () => {
  return useMutation({
    mutationFn: async (formData: TeamRegisterSchema) => {
      const data = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        if (value) {
          data.append(key, value);
        }
      }
      return await axios.post("/api/teams", data);
    },
  });
};

export default useRegisterTeam;
