import { ErrorCode } from "@/types";
import { Context } from "hono";
import { StatusCode } from "hono/utils/http-status";

//funksjon tatt fra https://github.com/mariuswallin/hiof-webapp-2024/blob/main/v5-next/backend/src/lib/error.ts
function codeToStatus(code: ErrorCode): StatusCode {
    switch (code) {
      case "BAD_REQUEST":
        return 400;
      case "FORBIDDEN":
      case "UNAUTHORIZED":
        return 403;
      case "NOT_FOUND":
        return 404;
      case "METHOD_NOT_ALLOWED":
        return 405;
      case "NOT_UNIQUE":
        return 409;
      case "RATE_LIMITED":
        return 429;
      case "INTERNAL_SERVER_ERROR":
        return 500;
    }
  }


  //funksjon tatt fra https://github.com/mariuswallin/hiof-webapp-2024/blob/main/v5-next/backend/src/lib/error.ts
 function statusToCode(status: StatusCode): ErrorCode {
    switch (status) {
      case 400:
        return "BAD_REQUEST";
      case 401:
        return "UNAUTHORIZED";
      case 403:
        return "FORBIDDEN";
      case 404:
        return "NOT_FOUND";
      case 405:
        return "METHOD_NOT_ALLOWED";
      case 500:
        return "INTERNAL_SERVER_ERROR";
      default:
        return "INTERNAL_SERVER_ERROR";
    }
  }

  //funksjon tatt fra https://github.com/mariuswallin/hiof-webapp-2024/blob/main/v5-next/backend/src/lib/error.ts
  export function errorResponse(c: Context, code: ErrorCode, message: string) {
    return c.json(
      {
        error: {
          code,
          message,
        },
      },
      { status: codeToStatus(code) }
    );
  }
  