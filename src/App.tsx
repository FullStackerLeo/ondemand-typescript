import { useState, useRef } from "react";
import logo from "./assets/react.svg";

import { Typography, Form, Button, Tabs } from "antd";

import TodoList from "./components/TodoList.tsx";
import TodoInput from "./components/TodoInput.tsx";
import { todoListData } from "./utils/data.ts";
import { MenuKey } from "./components/TodoList.tsx";

const { Title } = Typography;
const { TabPane } = Tabs;


function App() {
    const [todoList, setTodoList] = useState(todoListData);

    const callback = () => { };

    const activeTodoList = todoList.filter(todo => !todo.isCompleted);
    const completedTodoList = todoList.filter(todo => todo.isCompleted);

    const onClick = (todoId: string, key: MenuKey) => {
        if (key === "complete") {
            const newTodoList = todoList.map(todo => {
                if (todo.id === todoId) {
                    return { ...todo, isCompleted: !todo.isCompleted };
                }

                return todo;
            });

            setTodoList(newTodoList);
        } else if (key === "delete") {
            const newTodoList = todoList.filter(todo => todo.id !== todoId);
            setTodoList(newTodoList);
        }
    };


    const onFinish = (values: any) => {
        console.log("Received values from form: ", values);
    };
    const ref = useRef(null);

    return (
        <div className="App" ref={ref}>
            <div className="container header">
                <img src={logo} alt="" />
                <Title level={3}>图雀社  区：汇聚精彩的免费实战教程</Title>
            </div>
            <div className="container">
                <Form onFinish={onFinish}>
                    <Form.Item name="todo">
                        <TodoInput />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="container">
                <Tabs onChange={callback} type="card">
                    <TabPane tab="所有" key="1">
                        <TodoList todoList={todoList} onClick={onClick} />
                    </TabPane>
                    <TabPane tab="进行中" key="2">
                        <TodoList todoList={activeTodoList} onClick={onClick} />
                    </TabPane>
                    <TabPane tab="已完成" key="3">
                        <TodoList todoList={completedTodoList} onClick={onClick} />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}

export default App;