# שלב ראשון: בניית האפליקציה
FROM node:18 AS build

# נגדיר את תיקיית העבודה
WORKDIR /app

# נעתיק את קובצי ההגדרות (כדי ש-npm install ירוץ מהר כשאין שינוי בקוד)
COPY package*.json ./

# נתקין את התלויות
RUN npm install

# נעתיק את שאר הקבצים ונבנה את הפרויקט
COPY . .
RUN npm run build

# שלב שני: שרת סטטי להפקה
FROM nginx:alpine

# נעתיק את הקבצים הבנויים מתיקיית build לתוך Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# נפתח את הפורט
EXPOSE 80

# נריץ את nginx
CMD ["nginx", "-g", "daemon off;"]

