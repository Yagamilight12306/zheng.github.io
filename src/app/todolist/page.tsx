'use client';
import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
  scheduledTime?: Date; // 设定的时间
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState("");
  const [scheduledDateTime, setScheduledDateTime] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [editingScheduledTime, setEditingScheduledTime] = useState("");

  const addTodo = () => {
    if (inputText.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputText.trim(),
      completed: false,
      createdAt: new Date(),
      scheduledTime: scheduledDateTime ? new Date(scheduledDateTime) : undefined,
    };

    setTodos([...todos, newTodo]);
    setInputText("");
    setScheduledDateTime("");
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? {
            ...todo,
            completed: !todo.completed,
            completedAt: !todo.completed ? new Date() : undefined
          }
          : todo
      )
    );
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;

    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
    setEditingScheduledTime(todo.scheduledTime
      ? new Date(todo.scheduledTime).toISOString().slice(0, 16)
      : "");
  };

  const saveEdit = (id: number) => {
    if (editingText.trim() === "") return;

    setTodos(
      todos.map(todo =>
        todo.id === id
          ? {
            ...todo,
            text: editingText.trim(),
            scheduledTime: editingScheduledTime ? new Date(editingScheduledTime) : undefined
          }
          : todo
      )
    );
    setEditingId(null);
    setEditingText("");
    setEditingScheduledTime("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
    setEditingScheduledTime("");
  };

  const formatScheduledTime = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (diff < 0) {
      return `已过期 ${Math.abs(hours)}小时`;
    }
    if (minutes < 60) {
      return `${minutes}分钟后`;
    }
    if (hours < 24) {
      return `${hours}小时后`;
    }
    if (days < 7) {
      return `${days}天后`;
    }

    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const handleEditKeyPress = (e: React.KeyboardEvent, id: number) => {
    if (e.key === "Enter") {
      saveEdit(id);
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="relative flex justify-center w-full min-h-screen py-8 overflow-hidden bg-white" style={{ margin: 0, padding: 0 }}>
      {/* 波点背景层 - 草间弥生风格 */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2px)',
          backgroundSize: '50px 50px',
          backgroundPosition: '0 0, 25px 25px'
        }}></div>

      <div className="relative z-10 w-full max-w-3xl px-4 md:px-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 text-black" style={{ fontFamily: 'sans-serif' }}>
            待办事项管理
          </h1>
          <p className="text-black font-bold text-lg">高效管理你的任务，提升工作效率</p>
        </div>

        {/* 添加任务区域 - 扁平化圆形设计 */}
        <div className="relative bg-white rounded-full p-6 mb-6 border-4 border-black">
          {/* 波点装饰 - 草间弥生风格 */}
          <div className="absolute top-4 right-4 w-10 h-10 bg-black rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 bg-yellow-400 rounded-full border-2 border-black"></div>
          <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-red-600 rounded-full border-2 border-black"></div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入新的待办事项，按回车键添加..."
                className="flex-1 px-6 py-4 border-4 border-black rounded-full focus:outline-none text-lg bg-white placeholder:text-gray-500 font-bold"
              />
              <button
                onClick={addTodo}
                className="px-8 py-4 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-colors font-bold border-4 border-black text-lg"
              >
                ➕ 添加
              </button>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-black font-bold text-sm whitespace-nowrap">⏰ 设定时间:</label>
              <input
                type="datetime-local"
                value={scheduledDateTime}
                onChange={(e) => setScheduledDateTime(e.target.value)}
                className="flex-1 px-4 py-2 border-4 border-black rounded-full focus:outline-none text-sm bg-white font-bold"
              />
              {scheduledDateTime && (
                <button
                  onClick={() => setScheduledDateTime("")}
                  className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors font-bold border-4 border-black text-sm"
                >
                  ✕ 清除
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 统计信息 - 蒙德里安配色圆形 */}
        {totalCount > 0 && (
          <div className="mb-6 text-center flex justify-center gap-4">
            <div className="w-24 h-24 bg-red-600 rounded-full border-4 border-black flex flex-col items-center justify-center text-white font-bold"
              style={{ animation: 'float 3s ease-in-out infinite' }}>
              <p className="text-3xl">{totalCount}</p>
              <p className="text-xs">总任务</p>
            </div>
            <div className="w-24 h-24 bg-yellow-400 rounded-full border-4 border-black flex flex-col items-center justify-center text-black font-bold"
              style={{ animation: 'float 3s ease-in-out infinite 0.5s' }}>
              <p className="text-3xl">{completedCount}</p>
              <p className="text-xs">已完成</p>
            </div>
            <div className="w-24 h-24 bg-blue-600 rounded-full border-4 border-black flex flex-col items-center justify-center text-white font-bold"
              style={{ animation: 'float 3s ease-in-out infinite 1s' }}>
              <p className="text-3xl">{totalCount - completedCount}</p>
              <p className="text-xs">待完成</p>
            </div>
          </div>
        )}

        {/* 任务列表 - 扁平化圆形设计 */}
        <div className="space-y-4">
          {todos.length === 0 ? (
            <div className="bg-white rounded-full p-12 text-center border-4 border-black">
              <div className="text-6xl mb-4">⚪</div>
              <p className="text-xl font-bold text-black mb-2">暂无待办事项</p>
              <p className="text-black font-bold">添加你的第一个任务，开始高效工作吧！</p>
            </div>
          ) : (
            todos.map((todo, index) => {
              // 蒙德里安配色：红、黄、蓝、白
              const mondrianColors = [
                { bg: '#DC143C', text: 'white' }, // 红色
                { bg: '#FFD700', text: 'black' }, // 黄色
                { bg: '#3498DB', text: 'white' }, // 蓝色
                { bg: '#FFFFFF', text: 'black' }, // 白色
                { bg: '#DC143C', text: 'white' }, // 红色（循环）
              ];
              const color = mondrianColors[index % mondrianColors.length];

              return (
                <div
                  key={todo.id}
                  className={`relative rounded-full p-6 transition-all border-4 border-black ${todo.completed
                    ? "opacity-60"
                    : "hover:scale-105"
                    }`}
                  style={{
                    backgroundColor: color.bg,
                    color: color.text,
                    animation: todo.completed ? 'none' : `float ${3 + index * 0.5}s ease-in-out infinite`
                  }}
                >
                  {/* 波点装饰 - 草间弥生风格 */}
                  <div className="absolute top-3 right-3 w-8 h-8 bg-black rounded-full border-2 border-white"></div>
                  <div className="absolute bottom-3 left-3 w-6 h-6 bg-yellow-400 rounded-full border-2 border-black"></div>
                  {index % 3 === 0 && (
                    <div className="absolute top-1/2 right-1/4 w-5 h-5 bg-red-600 rounded-full border-2 border-black"></div>
                  )}

                  <div className="flex items-center gap-4">
                    {/* 完成复选框 - 圆形扁平化 */}
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id)}
                      className="w-8 h-8 rounded-full border-4 border-black focus:ring-4 focus:ring-yellow-400 cursor-pointer transform hover:scale-110 transition-transform accent-yellow-400"
                    />

                    {/* 任务内容 */}
                    <div className="flex-1">
                      {editingId === todo.id ? (
                        <div className="flex flex-col gap-2">
                          <input
                            type="text"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            onKeyPress={(e) => handleEditKeyPress(e, todo.id)}
                            className="w-full px-4 py-2 border-4 border-black rounded-full focus:outline-none focus:ring-4 focus:ring-yellow-400 bg-white font-bold text-black"
                          />
                          <div className="flex items-center gap-2">
                            <label className="text-black font-bold text-xs whitespace-nowrap">⏰ 时间:</label>
                            <input
                              type="datetime-local"
                              value={editingScheduledTime}
                              onChange={(e) => setEditingScheduledTime(e.target.value)}
                              className="flex-1 px-3 py-1 border-4 border-black rounded-full focus:outline-none text-xs bg-white font-bold"
                            />
                            {editingScheduledTime && (
                              <button
                                onClick={() => setEditingScheduledTime("")}
                                className="px-2 py-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors font-bold border-2 border-black text-xs"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => saveEdit(todo.id)}
                              className="px-4 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-bold border-2 border-black text-xs"
                            >
                              保存
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="px-4 py-1 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors font-bold border-2 border-black text-xs"
                            >
                              取消
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p
                            className={`text-lg font-bold mb-2 ${todo.completed
                              ? "line-through opacity-50"
                              : ""
                              }`}
                            style={{ color: color.text }}
                          >
                            {todo.text}
                          </p>
                          <div className="flex flex-wrap gap-4 text-xs font-bold" style={{ color: color.text, opacity: 0.8 }}>
                            <span className="flex items-center gap-1">
                              <span>🕐</span>
                              创建: {formatTime(todo.createdAt)}
                            </span>
                            {todo.scheduledTime && (
                              <span className={`flex items-center gap-1 ${new Date(todo.scheduledTime) < new Date() && !todo.completed
                                ? "text-red-600 font-bold"
                                : ""
                                }`}>
                                <span>⏰</span>
                                设定: {formatScheduledTime(todo.scheduledTime)}
                              </span>
                            )}
                            {todo.completed && todo.completedAt && (
                              <span className="flex items-center gap-1">
                                <span>✅</span>
                                完成: {formatTime(todo.completedAt)}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 操作按钮 - 圆形扁平化 */}
                    {editingId !== todo.id && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(todo)}
                          className="w-12 h-12 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-colors font-bold border-4 border-black text-lg"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="w-12 h-12 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors font-bold border-4 border-black text-lg"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* 清除已完成任务 - 扁平化圆形按钮 */}
        {completedCount > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setTodos(todos.filter(todo => !todo.completed))}
              className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-bold border-4 border-black text-lg"
            >
              🗑️ 清除已完成任务 ({completedCount})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


