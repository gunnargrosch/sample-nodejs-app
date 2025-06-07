FROM public.ecr.aws/lambda/nodejs:20

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY index.js ./

# Set the CMD to your handler
CMD [ "index.lambdaHandler" ]
