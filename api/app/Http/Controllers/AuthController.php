<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginAuth;
use App\Http\Requests\SignupAuth;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Create user
     *
     * @param  [string] name
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */
    public function signup(SignupAuth $request)
    {
        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        $user->save();

        return $this->returnUserToken($user, false);
    }

    /**
     * Login user and create token
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */
    public function login(LoginAuth $request)
    {

        $credentials = request(['email', 'password']);
        $remember = false;

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'errors' => ['unauthorized' => 'Invalid Credentials']
            ], 401);
        }

        if ($request->remember_me) {
            $remember = true;
        }

        $user = $request->user();
        return $this->returnUserToken($user, $remember);
    }

    /**
     * Return User Token after login and signup
     *
     * @param  [array] user
     * @param  [boolean] remember
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */
    public function returnUserToken($user, $remember)
    {
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;

        if ($remember) {
            $token->expires_at = Carbon::now()->addWeeks(1);
        }

        $token->save();

        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }

    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }


}