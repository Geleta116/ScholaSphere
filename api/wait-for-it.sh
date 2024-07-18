# Dockerfile for api service

# Install wait-for-it script
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

# Set up the rest of your Dockerfile
...

# Command to start the application with database wait
CMD ["sh", "-c", "/usr/wait-for-it.sh db:5432 -- npx prisma migrate deploy --preview-feature && npx prisma db seed && node dist/index.js"]
