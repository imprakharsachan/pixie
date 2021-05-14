/*
 * Copyright 2018- The Pixie Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { USER_QUERIES, GQLUserInfo } from '@pixie-labs/api';
import { ImmutablePixieQueryResult } from '../utils/types';

interface UserInfoHookResult {
  updateUserInfo: (id: string, isApproved: boolean) => Promise<void>;
  user: GQLUserInfo;
}

export function useUserInfo(): ImmutablePixieQueryResult<UserInfoHookResult> {
  const { loading, data, error } = useQuery<{ user: GQLUserInfo }>(
    USER_QUERIES.GET_USER_INFO,
    { fetchPolicy: 'network-only' },
  );

  const [updater] = useMutation<void, { id: string, isApproved: boolean }>(USER_QUERIES.SET_USER_INFO);

  // Waiting for state to settle ensures we don't change the result object's identity more than once.
  const resultIsStable = !loading && (error || data);

  // Abstracting away Apollo details, create resolves with the new ID string and delete accepts a string.
  // If an error occurs, it still falls through in the form of a rejected promise that .catch() will see.
  const result: UserInfoHookResult = React.useMemo(() => ({
    updateUserInfo: (id: string, isApproved: boolean) => updater({ variables: { id, isApproved } }).then(() => {}),
    user: loading || error || !data?.user ? undefined : data.user,
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [resultIsStable]);

  // Forcing the result to only present once it's settled, to avoid bouncy definitions.
  return [result, loading, error];
}
