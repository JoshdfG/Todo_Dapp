// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

import {Test, console} from "forge-std/Test.sol";
import {TaskContract} from "../src/Todo.sol";

contract TaskContractTest is Test {
    TaskContract taskContract;

    function setUp() public {
        taskContract = new TaskContract();
    }

    function testAddTask() public {
        taskContract.addTask("Test task", false);
        TaskContract.Task[] memory tasks = taskContract.getMyTasks();
        assertEq(tasks.length, 1);
        assertEq(tasks[0].taskText, "Test task");
    }

    function testGetMyTasks() public {
        taskContract.addTask("Task 1", false);
        taskContract.addTask("Task 2", false);
        TaskContract.Task[] memory tasks = taskContract.getMyTasks();
        assertEq(tasks.length, 2);
    }

    function testDeleteTask() public {
        taskContract.addTask("Task to delete", false);
        TaskContract.Task[] memory tasksBefore = taskContract.getMyTasks();
        assertEq(tasksBefore.length, 1);

        taskContract.deleteTask(0, true);
        TaskContract.Task[] memory tasksAfter = taskContract.getMyTasks();
        assertEq(tasksAfter.length, 0);
    }
}
