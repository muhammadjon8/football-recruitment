import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { CandidateFormData } from "../../../schemas/candidate.schema";

type CandidateEditInput = {
  id: string;
  data: CandidateFormData;
};

const useEditCandidate = () => {
  return useMutation({
    mutationFn: async ({ id, data }: CandidateEditInput) => {
      const response = await axios.patch(`/api/candidates/${id}`, data);
      return response.data;
    },
  });
};

export default useEditCandidate;
