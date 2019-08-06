package apienv

import (
	"errors"

	"github.com/gorilla/sessions"
	"github.com/spf13/pflag"
	"github.com/spf13/viper"
	authpb "pixielabs.ai/pixielabs/src/services/auth/proto"
	"pixielabs.ai/pixielabs/src/services/common/env"
)

func init() {
	pflag.String("session_key", "", "Cookie session key")
}

// APIEnv store the contextual authenv used for API server requests.
type APIEnv interface {
	env.Env
	CookieStore() *sessions.CookieStore
	AuthClient() authpb.AuthServiceClient
}

// Impl is an implementation of the APIEnv interface.
type Impl struct {
	*env.BaseEnv
	cookieStore *sessions.CookieStore
	authClient  authpb.AuthServiceClient
}

// New creates a new api env.
func New(ac authpb.AuthServiceClient) (APIEnv, error) {
	sessionKey := viper.GetString("session_key")
	if len(sessionKey) == 0 {
		return nil, errors.New("session_key is required for cookie store")
	}
	sessionStore := sessions.NewCookieStore([]byte(sessionKey))
	return &Impl{env.New(), sessionStore, ac}, nil
}

// CookieStore returns the CookieStore from the environment.
func (e *Impl) CookieStore() *sessions.CookieStore {
	return e.cookieStore

}

// AuthClient returns an auth service client.
func (e *Impl) AuthClient() authpb.AuthServiceClient {
	return e.authClient
}
