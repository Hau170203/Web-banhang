import { useMutation } from "@tanstack/react-query"

export const useMutationHook = (fnCallBack: (data: any) => Promise<any>) => {
    const mutation = useMutation({
        mutationFn: fnCallBack,
      })
    return mutation;
};