import { mutationOptions } from '@tanstack/react-query'

import {
    createCadService,
    deleteCadService,
    updateCadService,
} from '../_api'

type CreateCadServicePayload = Parameters<typeof createCadService>[0]
type UpdateCadServiceVariables = {
    slug: string
    payload: Parameters<typeof updateCadService>[1]
}

export const cadServiceMutations = {
    create: () =>
        mutationOptions({
            mutationFn: (payload: CreateCadServicePayload) =>
                createCadService(payload),
        }),
    update: () =>
        mutationOptions({
            mutationFn: ({ slug, payload }: UpdateCadServiceVariables) =>
                updateCadService(slug, payload),
        }),
    delete: () =>
        mutationOptions({
            mutationFn: (slug: string) => deleteCadService(slug),
        }),
}
