# Используем официальный образ Node.js с Alpine
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Строим приложение
RUN npm run build

# Экспонируем порт
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]
