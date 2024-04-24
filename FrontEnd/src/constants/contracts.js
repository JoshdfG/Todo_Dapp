import { ethers } from "ethers";
import todoAbi from "./todoAbi.json";

export const getTodoContract = (providerOrSigner) => {
  return new ethers.Contract(
    import.meta.env.VITE_TODO_CONTRACT_ADDRESS,
    todoAbi,
    providerOrSigner
  );
};
