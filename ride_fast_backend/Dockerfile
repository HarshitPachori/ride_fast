FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY target/ride_fast_backend-0.0.1-SNAPSHOT.jar /app/ride-fast-backend.jar
EXPOSE 8080
CMD [ "java", "-jar","ride-fast-backend.jar" ]