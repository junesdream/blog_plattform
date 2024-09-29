FROM openjdk:19
ENV ENVIRONMENT=prod
LABEL maintainer="Blog_Plattform"

ADD  backend/target/app.jar app.jar
CMD [ "sh", "-c", "java -jar /app.jdas ist ar" ]
