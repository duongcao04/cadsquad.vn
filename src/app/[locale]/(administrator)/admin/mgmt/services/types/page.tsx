'use client'

import { useEffect, useState } from 'react'

import {
    Button,
    Card,
    CardBody,
    Divider,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Spinner,
    Tab,
    Tabs,
    Textarea,
} from '@heroui/react'
import { useQuery } from '@tanstack/react-query'
import {
    ArrowLeft,
    Link as LinkIcon,
    Plus,
    Save,
    Settings2,
} from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'

import {
    serviceTypeOptions,
    useCreateServiceType,
    useUpdateServiceType,
} from '@/queires'
import { Language, TServiceTypeTranslation } from '@/types'

import {
    AdminPageContainer,
    AdminPageHeading,
} from '../../../../../../../components'
import { INTERNAL_URLS } from '../../../../../../../lib'

const SUPPORTED_LANGUAGES: { key: Language; label: string }[] = [
    { key: 'EN', label: 'English (EN)' },
    { key: 'VI', label: 'Tiếng Việt (VI)' },
]

interface Props {
    mode: 'create' | 'edit'
    id: string
}

export default function CreateServiceTypePage({ mode, id }: Props) {
    const navigate = useNavigate()

    const [hasInitialized, setHasInitialized] = useState(false)

    const { data, isLoading: isFetching } = useQuery({
        ...serviceTypeOptions(id),
        enabled: mode === 'edit' && !!id,
    })

    const existingData = data?.serviceType

    const { mutate: createServiceType, isPending: isCreating } =
        useCreateServiceType()
    const { mutate: updateServiceType, isPending: isUpdating } =
        useUpdateServiceType()
    const isPending = isCreating || isUpdating

    const [activeLang, setActiveLang] = useState<Language>('EN')
    const [activeLanguages, setActiveLanguages] = useState<Language[]>(['EN'])

    const [formData, setFormData] = useState({
        code: '',
        translations: {
            EN: { displayName: '', description: '', brochureUrl: '' },
            VI: { displayName: '', description: '', brochureUrl: '' },
        },
    })

    useEffect(() => {
        if (mode === 'edit' && existingData && !hasInitialized) {
            const fetchedTranslations = existingData.translations || []

            const loadedLangs = fetchedTranslations.map(
                (t: TServiceTypeTranslation) => t.language as Language
            )

            if (loadedLangs.length > 0) {
                setActiveLanguages(loadedLangs)
                setActiveLang(
                    loadedLangs.includes('EN') ? 'EN' : loadedLangs[0]
                )
            }

            const mappedTranslations = { ...formData.translations }
            fetchedTranslations.forEach((t: TServiceTypeTranslation) => {
                mappedTranslations[t.language as Language] = {
                    displayName: t.displayName || '',
                    description: t.description || '',
                    brochureUrl: t.brochureUrl || '',
                }
            })

            setFormData({
                code: existingData.code || '',
                translations: mappedTranslations,
            })

            setHasInitialized(true)
        }
    }, [existingData, mode, hasInitialized, formData.translations])

    const handleTranslationChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            translations: {
                ...prev.translations,
                [activeLang]: {
                    ...prev.translations[activeLang],
                    [field]: value,
                },
            },
        }))
    }

    const handleAddLanguage = (langKey: Language) => {
        if (!activeLanguages.includes(langKey)) {
            setActiveLanguages((prev) => [...prev, langKey])
        }
        setActiveLang(langKey)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const payload = {
            ...(mode === 'edit' ? { id: id! } : {}),
            code: formData.code,
            translations: activeLanguages.map((lang) => ({
                language: lang,
                ...formData.translations[lang],
            })),
        }

        const mutationConfig = {
            onSuccess: () => {
                navigate({ to: '/admin/mgmt/services' })
            },
        }

        if (mode === 'edit') {
            updateServiceType({ ...payload, id: id! }, mutationConfig)
        } else {
            createServiceType(payload, mutationConfig)
        }
    }

    if (isFetching) {
        return (
            <AdminPageContainer>
                <div className="flex flex-1 items-center justify-center min-h-[500px]">
                    <Spinner
                        color="secondary"
                        size="lg"
                        label="Loading category data..."
                    />
                </div>
            </AdminPageContainer>
        )
    }

    const unselectedLanguages = SUPPORTED_LANGUAGES.filter(
        (lang) => !activeLanguages.includes(lang.key)
    )

    return (
        <AdminPageContainer>
            <AdminPageHeading
                title={
                    <div className="flex items-center gap-4">
                        <Button
                            as={Link}
                            to={INTERNAL_URLS.admin.management.services.all}
                            isIconOnly
                            variant="light"
                            radius="full"
                        >
                            <ArrowLeft size={20} className="text-slate-500" />
                        </Button>
                        <div>
                            <h1 className="text-xl font-semibold text-slate-900">
                                {mode === 'edit'
                                    ? 'Edit Service Category'
                                    : 'Create Service Category'}
                            </h1>
                            <p className="text-xs text-slate-500 mt-0.5">
                                {mode === 'edit'
                                    ? 'Update details and translations for this category.'
                                    : 'Add a new overarching type to group your services.'}
                            </p>
                        </div>
                    </div>
                }
                actions={
                    <div className="flex items-center gap-1 bg-default-100 p-1 rounded-full">
                        <Tabs
                            selectedKey={activeLang}
                            onSelectionChange={(key) =>
                                setActiveLang(key as Language)
                            }
                            color="secondary"
                            radius="full"
                            size="sm"
                        >
                            {activeLanguages.map((langKey) => (
                                <Tab
                                    key={langKey}
                                    title={
                                        SUPPORTED_LANGUAGES.find(
                                            (l) => l.key === langKey
                                        )?.label
                                    }
                                />
                            ))}
                        </Tabs>

                        {unselectedLanguages.length > 0 && (
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        variant="light"
                                        color="secondary"
                                        radius="full"
                                        className="ml-1"
                                    >
                                        <Plus size={16} />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Add Translation"
                                    onAction={(key) =>
                                        handleAddLanguage(key as Language)
                                    }
                                >
                                    {unselectedLanguages.map((lang) => (
                                        <DropdownItem key={lang.key}>
                                            {lang.label}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                        )}
                    </div>
                }
            />
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-[1200px] mx-auto flex flex-col gap-6 flex-1"
            >
                <div className="flex flex-col xl:flex-row gap-6 animate-in fade-in duration-300 w-full flex-1">
                    <Card
                        shadow="sm"
                        radius="lg"
                        className="flex-1 border-none h-fit"
                    >
                        <CardBody className="p-8 space-y-6">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-lg font-semibold text-slate-900">
                                    Localized Details ({activeLang})
                                </h2>
                                {activeLang !== 'EN' && (
                                    <span className="text-xs font-medium text-secondary bg-secondary-50 px-3 py-1 rounded-full">
                                        Translating to {activeLang}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-6">
                                <Input
                                    label="Display Name"
                                    placeholder="e.g. Web Development"
                                    variant="flat"
                                    labelPlacement="outside"
                                    value={
                                        formData.translations[activeLang]
                                            .displayName
                                    }
                                    onChange={(e) =>
                                        handleTranslationChange(
                                            'displayName',
                                            e.target.value
                                        )
                                    }
                                    isRequired={activeLang === 'EN'}
                                    radius="lg"
                                    size="lg"
                                />

                                <Textarea
                                    label="Description"
                                    placeholder="Briefly describe what this category entails..."
                                    variant="flat"
                                    labelPlacement="outside"
                                    minRows={4}
                                    value={
                                        formData.translations[activeLang]
                                            .description
                                    }
                                    onChange={(e) =>
                                        handleTranslationChange(
                                            'description',
                                            e.target.value
                                        )
                                    }
                                    radius="lg"
                                    size="lg"
                                />

                                <Input
                                    label="Brochure URL (Optional)"
                                    placeholder="https://..."
                                    variant="flat"
                                    labelPlacement="outside"
                                    startContent={
                                        <LinkIcon
                                            size={16}
                                            className="text-slate-400 mr-2"
                                        />
                                    }
                                    value={
                                        formData.translations[activeLang]
                                            .brochureUrl
                                    }
                                    onChange={(e) =>
                                        handleTranslationChange(
                                            'brochureUrl',
                                            e.target.value
                                        )
                                    }
                                    radius="lg"
                                    size="lg"
                                    description="Link to a PDF or external brochure specific to this language."
                                />
                            </div>
                        </CardBody>
                    </Card>

                    <Card
                        shadow="sm"
                        radius="lg"
                        className="xl:w-[380px] shrink-0 border-none h-fit"
                    >
                        <CardBody className="p-0">
                            <div className="p-6 border-b border-divider bg-default-50">
                                <h3 className="text-sm font-semibold flex items-center gap-2 text-slate-800">
                                    <Settings2
                                        size={16}
                                        className="text-slate-500"
                                    />{' '}
                                    Global Settings
                                </h3>
                            </div>

                            <div className="p-6 space-y-6">
                                <Input
                                    label="Category Code"
                                    placeholder="e.g. WEB_DEV"
                                    variant="flat"
                                    labelPlacement="outside"
                                    value={formData.code}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            code: e.target.value.toUpperCase(),
                                        })
                                    }
                                    isRequired
                                    isReadOnly={mode === 'edit'}
                                    radius="lg"
                                    description={
                                        mode === 'edit'
                                            ? 'Code cannot be changed.'
                                            : 'Uppercase identifier.'
                                    }
                                />

                                <Divider className="my-2" />

                                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex flex-col gap-2">
                                    <h4 className="text-xs font-semibold text-blue-800 uppercase tracking-wider">
                                        Note
                                    </h4>
                                    <p className="text-xs text-blue-600/80 leading-relaxed">
                                        You are{' '}
                                        {mode === 'edit'
                                            ? 'updating'
                                            : 'creating'}{' '}
                                        <strong>
                                            {activeLanguages.length}
                                        </strong>{' '}
                                        localized version(s).
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 pt-0 mt-2">
                                <Button
                                    type="submit"
                                    color="secondary"
                                    size="lg"
                                    radius="lg"
                                    className="w-full font-medium shadow-md shadow-secondary/20"
                                    startContent={
                                        !isPending && <Save size={18} />
                                    }
                                    isLoading={isPending}
                                >
                                    {mode === 'edit'
                                        ? 'Update Category'
                                        : 'Save Category'}
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </form>
        </AdminPageContainer>
    )
}
