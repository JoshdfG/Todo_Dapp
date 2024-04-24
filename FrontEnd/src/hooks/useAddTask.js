import { useState } from "react";
import { toast } from "react-toastify";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { isSupportedChain } from "../utils";
import { getTodoContract } from "../constants/contracts";
import { getProvider } from "../constants/provider";

const useAddTodo = () => {
  const [getTodos, setGetTodos] = useState(null);
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const setTodo = async (title) => {
    // Check if the current network is supported
    if (!isSupportedChain(chainId)) {
      return toast.error("Wrong network!", {
        position: "top-right",
        bodyClassName: "red",
      });
    }

    const addTodo = getProvider(walletProvider);
    const signer = await addTodo.getSigner();
    // Initialize the contract with the signer
    const contract = getTodoContract(signer);

    try {
      // Call the register function on the contract
      const tx = await contract.addTask(title, false);
      console.log("registration :", tx);

      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      console.log("receipt :", receipt);

      // Check if the transaction was successful
      if (receipt.status) {
        getMyTasks();
        return toast.success("Registration successful!", {
          position: "top-right",
        });
      }

      // Handle registration failure
      toast.error("Registration failed!", { position: "top-right" });
    } catch (error) {
      console.log(error);
      toast.error("Registration failed!", { position: "top-right" });
    }
  };

  // Main hook to set and get tasks
  const getMyTasks = async () => {
    try {
      if (!isSupportedChain(chainId))
        return toast.error("Wrong network!", { position: "top-right" });

      const provider = getProvider(walletProvider);

      const signer = await provider.getSigner();
      const contract = getTodoContract(signer);
      const result = await contract.getMyTasks();
      console.log(result);
      setGetTodos(result);
    } catch (error) {
      console.error("Error getting user's tasks:", error);
    }
  };

  return { setTodo, getTodos, getMyTasks };
};

export default useAddTodo;
