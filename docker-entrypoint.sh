sleep 2

echo "Apply migrations"
npm run db:migrate

echo "Start server"
npm run start
