import "iron-session";

declare module "iron-session" {
  interface IronSessionData {
    email?: string;
    grantId?: string;
  }
}