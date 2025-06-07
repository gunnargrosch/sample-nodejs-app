FROM public.ecr.aws/lambda/nodejs:18

# Copy package files
COPY package*.json ${LAMBDA_TASK_ROOT}/

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY src/ ${LAMBDA_TASK_ROOT}/src/

# Set the CMD to your handler
CMD [ "src/index.lambdaHandler" ]
