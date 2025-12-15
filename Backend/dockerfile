FROM eclipse-temurin:24-jdk
WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN apt-get update && apt-get install -y maven
RUN mvn -e -B clean package -DskipTests

EXPOSE 8080
CMD java -jar target/*.jar