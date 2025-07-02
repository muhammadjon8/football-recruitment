import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { CandidateFormData } from "../../../schemas/candidate.schema";

const useRegisterCandidate = () => {
  return useMutation({
    mutationFn: async (formData: CandidateFormData) => {
      const data = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        if (value) {
          data.append(key, value);
        }
      }
      return await axios.post("/api/candidates", data);
    },
  });
};

export default useRegisterCandidate;