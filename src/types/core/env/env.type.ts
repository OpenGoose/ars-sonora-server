export interface Env {
  port: number;
  database: {
    url: string;
  };
  swagger: {
    enabled: boolean;
  };
  jwt: {
    secret: string;
  };
}
