///////////////////////////////////////////////////////////////////////////
/// GENERATED FILE --- DO NOT EDIT --- YOUR CHANGES WILL BE OVERWRITTEN ///
///////////////////////////////////////////////////////////////////////////

export type AppRoutes = "/" | "/detail/[id]/";

export interface AppRouteMap {
  "/": {};
  "/detail/[id]/": { id: string };
}

export interface AppRouteParamsFunction {
  (route: "/", params?: {}): string;
  (route: "/detail/[id]/", params: { id: string }): string;
}

export type AppLinkProps =
  | { route: "/" }
  | { route: "/detail/[id]/"; "param:id": string };
