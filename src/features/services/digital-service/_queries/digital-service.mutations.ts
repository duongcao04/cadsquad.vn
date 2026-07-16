import { mutationOptions } from '@tanstack/react-query'

import {
    createDigitalService,
    deleteDigitalService,
    updateDigitalService,
} from '../_api'

type CreateDigitalServicePayload = Parameters<typeof createDigitalService>[0]
type UpdateDigitalServiceVariables = {
    slug: string
    payload: Parameters<typeof updateDigitalService>[1]
}

export const digitalServiceMutations = {
    create: () =>
        mutationOptions({
            mutationFn: (payload: CreateDigitalServicePayload) =>
                createDigitalService(payload),
        }),
    update: () =>
        mutationOptions({
            mutationFn: ({ slug, payload }: UpdateDigitalServiceVariables) =>
                updateDigitalService(slug, payload),
        }),
    delete: () =>
        mutationOptions({
            mutationFn: (slug: string) => deleteDigitalService(slug),
        }),
}
