'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import {
    Button,
    Card,
    CardBody,
    Chip,
    Divider,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Select,
    SelectItem,
    Spinner,
    Tab,
    Tabs,
    Textarea,
} from '@heroui/react'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Link as LinkIcon,
    Plus,
    Search,
    Settings2,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import RichTextEditor from '@/components/RichTextEditor'

import {
    AdminPageBody,
    AdminPageContainer,
    AdminPageHeading,
} from '../../../../../../../components'
import MediaUploader from '../../../../../../../features/service-management/components/MediaUploader'
import {
    serviceOptions,
    serviceTypesListOptions,
    useCreateServiceMutation,
    useUpdateServiceMutation,
} from '../../../../../../../queires'
import {
    Language,
    TServiceTranslation,
    TServiceType,
    TServiceTypeTranslation,
} from '../../../../../../../types'

type Step = 'general' | 'content'

const SUPPORTED_LANGUAGES: { key: Language; label: string }[] = [
    { key: 'EN', label: 'English (EN)' },
    { key: 'VI', label: 'Tiếng Việt (VI)' },
]

export default function CreateServicePage() {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Logic: Read URL params. Fallback to create if edit lacks an ID.
    const propMode = searchParams.get('mode')
    const propId = searchParams.get('id')
    const mode =
        propMode === 'edit' && !propId
            ? 'create'
            : propMode === 'edit'
              ? 'edit'
              : 'create'
    const id = propId || ''

    const [step, setStep] = useState<Step>('general')
    const [activeLang, setActiveLang] = useState<Language>('EN')
    const [activeLanguages, setActiveLanguages] = useState<Language[]>(['EN'])

    // Safety flag to prevent infinite re-seeding of form data
    const [hasInitialized, setHasInitialized] = useState(false)

    // Fetch Categories for the dropdown
    const {
        data: { serviceTypes },
    } = useSuspenseQuery(serviceTypesListOptions)

    // Fetch existing Service data ONLY if in Edit Mode
    const { data, isLoading: isFetching } = useQuery({
        ...serviceOptions(id),
        enabled: mode === 'edit' && !!id,
    })

    const existingData = data?.service

    // Mutations
    const { mutate: createService, isPending: isCreating } =
        useCreateServiceMutation()
    const { mutate: updateService, isPending: isUpdating } =
        useUpdateServiceMutation()
    const isPending = isCreating || isUpdating

    const [formData, setFormData] = useState({
        orderNumber: '',
        serviceTypeId: '',
        thumbnailUrl: '',
        backgroundCoverUrl: '',
        translations: {
            EN: {
                title: '',
                slug: '',
                description: '',
                shortDescription: '',
                content: '',
                seoTitle: '',
                seoDescription: '',
                seoKeywords: '',
            },
            VI: {
                title: '',
                slug: '',
                description: '',
                shortDescription: '',
                content: '',
                seoTitle: '',
                seoDescription: '',
                seoKeywords: '',
            },
        },
    })

    // Ensure the selected keys array always contains strings
    const serviceTypeSelectedKeys = useMemo(
        () =>
            formData.serviceTypeId ? [formData.serviceTypeId.toString()] : [],
        [formData.serviceTypeId]
    )

    // Populate data when existingData loads
    useEffect(() => {
        if (mode === 'edit' && existingData && !hasInitialized) {
            const loadedLangs = existingData.translations.map(
                (t: TServiceTranslation) => t.language as Language
            )
            if (loadedLangs.length > 0) {
                setActiveLanguages(loadedLangs)
                setActiveLang(
                    loadedLangs.includes('EN') ? 'EN' : loadedLangs[0]
                )
            }

            // Static default — no reference to formData state
            const emptyTranslation = {
                title: '',
                slug: '',
                description: '',
                shortDescription: '',
                content: '',
                seoTitle: '',
                seoDescription: '',
                seoKeywords: '',
            }
            const mappedTranslations: typeof formData.translations = {
                EN: { ...emptyTranslation },
                VI: { ...emptyTranslation },
            }

            existingData.translations.forEach((t: TServiceTranslation) => {
                mappedTranslations[t.language as Language] = {
                    title: t.title || '',
                    slug: t.slug || '',
                    description: t.description || '',
                    shortDescription: t.shortDescription || '',
                    content: t.content || '',
                    seoTitle: t.seoTitle || '',
                    seoDescription: t.seoDescription || '',
                    seoKeywords: Array.isArray(t.seoKeywords)
                        ? t.seoKeywords.join(', ')
                        : t.seoKeywords || '',
                }
            })

            setFormData({
                orderNumber: existingData.orderNumber?.toString() || '',
                // Explicitly cast incoming ID to a string
                serviceTypeId: existingData.serviceTypeId?.toString() || '',
                thumbnailUrl: existingData.thumbnail?.url || '',
                backgroundCoverUrl: existingData.backgroundCover?.url || '',
                translations: mappedTranslations,
            })

            // Mark as initialized to prevent future loops
            setHasInitialized(true)
        }
    }, [existingData, mode, hasInitialized])

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

    const handleStepChange = useCallback(
        (key: React.Key) => setStep(key as Step),
        []
    )

    const handleActiveLangChange = useCallback(
        (key: React.Key) => setActiveLang(key as Language),
        []
    )

    const languageTabItems = useMemo(
        () =>
            activeLanguages.map((langKey) => {
                const langConfig = SUPPORTED_LANGUAGES.find(
                    (l) => l.key === langKey
                )
                return { key: langKey, label: langConfig?.label ?? langKey }
            }),
        [activeLanguages]
    )

    const unselectedLanguages = SUPPORTED_LANGUAGES.filter(
        (lang) => !activeLanguages.includes(lang.key)
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const payload = {
            ...(mode === 'edit' && { id }),
            orderNumber: parseInt(formData.orderNumber) || 0,
            serviceTypeId: formData.serviceTypeId || undefined,
            thumbnailUrl: formData.thumbnailUrl || undefined,
            backgroundCoverUrl: formData.backgroundCoverUrl || undefined,
            translations: activeLanguages.map((lang) => ({
                language: lang,
                ...formData.translations[lang],
            })),
        }

        const mutationArgs = {
            onSuccess: () => {
                router.push('/admin/mgmt/services')
            },
        }

        if (mode === 'edit') {
            updateService(payload, mutationArgs)
        } else {
            createService(payload, mutationArgs)
        }
    }

    // Loading overlay
    if (isFetching) {
        return (
            <AdminPageContainer>
                <div className="flex flex-1 items-center justify-center min-h-[500px]">
                    <Spinner
                        color="secondary"
                        label="Loading Service..."
                        size="lg"
                    />
                </div>
            </AdminPageContainer>
        )
    }

    return (
        <AdminPageContainer>
            <AdminPageHeading
                title={
                    <div className="flex items-center gap-4">
                        <Button
                            as={Link}
                            href="/admin/mgmt/services"
                            isIconOnly
                            variant="light"
                            radius="full"
                        >
                            <ArrowLeft size={20} className="text-slate-500" />
                        </Button>
                        <p>
                            {mode === 'edit'
                                ? 'Edit Service'
                                : 'Create New Service'}
                        </p>
                    </div>
                }
            />
            <AdminPageBody>
                <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-6 flex-1"
                >
                    {/* ========================================================= */}
                    {/* HEADER & STEPPER */}
                    {/* ========================================================= */}
                    <Card
                        shadow="sm"
                        radius="lg"
                        className="border-none w-full shrink-0"
                    >
                        <CardBody className="flex-row items-center justify-between px-6 py-4">
                            <Tabs
                                selectedKey={step}
                                onSelectionChange={handleStepChange}
                                color="secondary"
                                variant="light"
                                classNames={{
                                    cursor: 'bg-secondary-100 text-secondary-600',
                                }}
                            >
                                <Tab
                                    key="general"
                                    title={
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'general' ? 'bg-secondary text-white' : 'bg-default-200'}`}
                                            >
                                                1
                                            </div>
                                            General Info
                                        </div>
                                    }
                                />
                                <Tab
                                    key="content"
                                    title={
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'content' ? 'bg-secondary text-white' : 'bg-default-200'}`}
                                            >
                                                2
                                            </div>
                                            Write Content
                                        </div>
                                    }
                                />
                            </Tabs>

                            {/* Dynamic Language Tabs & Dropdown */}
                            <div className="flex items-center gap-1 bg-default-100 p-1 rounded-full">
                                <Tabs
                                    selectedKey={activeLang}
                                    onSelectionChange={handleActiveLangChange}
                                    color="secondary"
                                    radius="full"
                                    size="sm"
                                    items={languageTabItems}
                                >
                                    {(item) => (
                                        <Tab
                                            key={item.key}
                                            title={item.label}
                                        />
                                    )}
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
                                                handleAddLanguage(
                                                    key as Language
                                                )
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
                        </CardBody>
                    </Card>

                    {/* ========================================================= */}
                    {/* STEP 1: GENERAL INFO */}
                    {/* ========================================================= */}
                    {step === 'general' && (
                        <div className="flex flex-col xl:flex-row gap-6 animate-in fade-in duration-300 w-full flex-1">
                            <Card
                                shadow="sm"
                                radius="lg"
                                className="flex-1 border-none"
                            >
                                <CardBody className="p-8 space-y-6">
                                    <h2 className="text-lg font-semibold text-slate-900">
                                        Basic Information ({activeLang})
                                    </h2>

                                    <div className="flex flex-col gap-6">
                                        <Input
                                            label="Service Title"
                                            placeholder="e.g. Web Development"
                                            variant="flat"
                                            labelPlacement="outside"
                                            value={
                                                formData.translations[
                                                    activeLang
                                                ].title
                                            }
                                            onChange={(e) =>
                                                handleTranslationChange(
                                                    'title',
                                                    e.target.value
                                                )
                                            }
                                            isRequired
                                            radius="lg"
                                            size="lg"
                                        />
                                        <Input
                                            label="URL Slug"
                                            placeholder="e.g. web-development"
                                            variant="flat"
                                            labelPlacement="outside"
                                            value={
                                                formData.translations[
                                                    activeLang
                                                ].slug
                                            }
                                            onChange={(e) =>
                                                handleTranslationChange(
                                                    'slug',
                                                    e.target.value
                                                )
                                            }
                                            isRequired
                                            radius="lg"
                                            size="lg"
                                        />
                                        <Textarea
                                            label="Short Description"
                                            placeholder="Used for cards and lists..."
                                            variant="flat"
                                            labelPlacement="outside"
                                            minRows={2}
                                            value={
                                                formData.translations[
                                                    activeLang
                                                ].shortDescription
                                            }
                                            onChange={(e) =>
                                                handleTranslationChange(
                                                    'shortDescription',
                                                    e.target.value
                                                )
                                            }
                                            isRequired
                                            radius="lg"
                                            size="lg"
                                        />
                                        <Textarea
                                            label="Full Description"
                                            placeholder="Detailed description of the service..."
                                            variant="flat"
                                            labelPlacement="outside"
                                            minRows={4}
                                            value={
                                                formData.translations[
                                                    activeLang
                                                ].description
                                            }
                                            onChange={(e) =>
                                                handleTranslationChange(
                                                    'description',
                                                    e.target.value
                                                )
                                            }
                                            isRequired
                                            radius="lg"
                                            size="lg"
                                        />
                                    </div>

                                    <Divider className="my-4" />

                                    <div className="flex justify-end">
                                        <Button
                                            color="secondary"
                                            endContent={
                                                <ArrowRight size={16} />
                                            }
                                            onClick={() => setStep('content')}
                                            className="font-medium shadow-md shadow-secondary/20 px-8"
                                            radius="lg"
                                            size="lg"
                                        >
                                            Continue to Content
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>

                            {/* Right Sidebar: Settings & SEO */}
                            <Card
                                shadow="sm"
                                radius="lg"
                                className="xl:w-[450px] shrink-0 border-none h-fit"
                            >
                                <Tabs
                                    fullWidth
                                    size="md"
                                    aria-label="Sidebar Tabs"
                                    variant="underlined"
                                    color="secondary"
                                    classNames={{
                                        tabList:
                                            'gap-6 w-full relative rounded-none p-0 border-b border-divider px-6',
                                        tab: 'max-w-fit px-0 h-14',
                                        panel: 'p-6 bg-default-50',
                                    }}
                                >
                                    <Tab
                                        key="settings"
                                        title={
                                            <div className="flex items-center gap-2">
                                                <Settings2 size={16} /> Global
                                                Settings
                                            </div>
                                        }
                                    >
                                        <div className="space-y-8">
                                            <div className="space-y-5">
                                                <Input
                                                    type="number"
                                                    label="Order Number"
                                                    placeholder="e.g. 1"
                                                    variant="flat"
                                                    labelPlacement="outside"
                                                    value={formData.orderNumber}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            orderNumber:
                                                                e.target.value,
                                                        })
                                                    }
                                                    radius="lg"
                                                />
                                                <Select
                                                    label="Service Type"
                                                    placeholder="Select a category"
                                                    variant="flat"
                                                    disallowEmptySelection
                                                    labelPlacement="outside"
                                                    selectedKeys={
                                                        serviceTypeSelectedKeys
                                                    }
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            serviceTypeId:
                                                                e.target.value,
                                                        })
                                                    }
                                                    radius="lg"
                                                >
                                                    {serviceTypes.map(
                                                        (st: TServiceType) => (
                                                            <SelectItem
                                                                key={st.id.toString()}
                                                                textValue={
                                                                    st.translations.find(
                                                                        (
                                                                            tl: TServiceTypeTranslation
                                                                        ) =>
                                                                            tl.language ===
                                                                            'EN'
                                                                    )
                                                                        ?.displayName
                                                                }
                                                            >
                                                                {
                                                                    st.translations.find(
                                                                        (
                                                                            tl: TServiceTypeTranslation
                                                                        ) =>
                                                                            tl.language ===
                                                                            'EN'
                                                                    )
                                                                        ?.displayName
                                                                }
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </Select>
                                            </div>

                                            {/* Media Assets with URL Option */}
                                            <div>
                                                <span className="block text-sm font-medium text-foreground pb-3">
                                                    Media Assets
                                                </span>
                                                <div className="flex flex-col gap-8">
                                                    {/* Service Thumbnail */}
                                                    <div className="flex flex-col gap-3">
                                                        <span className="text-sm font-medium text-default-600">
                                                            Service Thumbnail
                                                        </span>
                                                        <MediaUploader
                                                            label="Upload Thumbnail"
                                                            value={
                                                                formData.thumbnailUrl
                                                            }
                                                            onChange={(url) =>
                                                                setFormData({
                                                                    ...formData,
                                                                    thumbnailUrl:
                                                                        url,
                                                                })
                                                            }
                                                        />
                                                        <Input
                                                            placeholder="Or paste image URL here..."
                                                            variant="flat"
                                                            value={
                                                                formData.thumbnailUrl
                                                            }
                                                            onChange={(e) =>
                                                                setFormData({
                                                                    ...formData,
                                                                    thumbnailUrl:
                                                                        e.target
                                                                            .value,
                                                                })
                                                            }
                                                            radius="lg"
                                                            startContent={
                                                                <LinkIcon
                                                                    size={16}
                                                                    className="text-default-400"
                                                                />
                                                            }
                                                        />
                                                    </div>

                                                    <Divider />

                                                    {/* Background Cover */}
                                                    <div className="flex flex-col gap-3">
                                                        <span className="text-sm font-medium text-default-600">
                                                            Background Cover
                                                        </span>
                                                        <MediaUploader
                                                            label="Upload Background Cover"
                                                            value={
                                                                formData.backgroundCoverUrl
                                                            }
                                                            onChange={(url) =>
                                                                setFormData({
                                                                    ...formData,
                                                                    backgroundCoverUrl:
                                                                        url,
                                                                })
                                                            }
                                                        />
                                                        <Input
                                                            placeholder="Or paste image URL here..."
                                                            variant="flat"
                                                            value={
                                                                formData.backgroundCoverUrl
                                                            }
                                                            onChange={(e) =>
                                                                setFormData({
                                                                    ...formData,
                                                                    backgroundCoverUrl:
                                                                        e.target
                                                                            .value,
                                                                })
                                                            }
                                                            radius="lg"
                                                            startContent={
                                                                <LinkIcon
                                                                    size={16}
                                                                    className="text-default-400"
                                                                />
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab>

                                    <Tab
                                        key="seo"
                                        title={
                                            <div className="flex items-center gap-2">
                                                <Search size={16} /> Localized
                                                SEO
                                            </div>
                                        }
                                    >
                                        <div className="space-y-6">
                                            <Input
                                                label={`SEO Title (${activeLang})`}
                                                placeholder="Optimal: 50-60 chars"
                                                variant="flat"
                                                labelPlacement="outside"
                                                value={
                                                    formData.translations[
                                                        activeLang
                                                    ].seoTitle
                                                }
                                                onChange={(e) =>
                                                    handleTranslationChange(
                                                        'seoTitle',
                                                        e.target.value
                                                    )
                                                }
                                                radius="lg"
                                            />
                                            <Textarea
                                                label={`SEO Description (${activeLang})`}
                                                placeholder="Optimal: 150-160 chars"
                                                variant="flat"
                                                labelPlacement="outside"
                                                minRows={4}
                                                value={
                                                    formData.translations[
                                                        activeLang
                                                    ].seoDescription
                                                }
                                                onChange={(e) =>
                                                    handleTranslationChange(
                                                        'seoDescription',
                                                        e.target.value
                                                    )
                                                }
                                                radius="lg"
                                            />
                                            <Input
                                                label={`Keywords (${activeLang})`}
                                                placeholder="Comma separated..."
                                                variant="flat"
                                                labelPlacement="outside"
                                                value={
                                                    formData.translations[
                                                        activeLang
                                                    ].seoKeywords
                                                }
                                                onChange={(e) =>
                                                    handleTranslationChange(
                                                        'seoKeywords',
                                                        e.target.value
                                                    )
                                                }
                                                radius="lg"
                                            />
                                        </div>
                                    </Tab>
                                </Tabs>
                            </Card>
                        </div>
                    )}

                    {/* ========================================================= */}
                    {/* STEP 2: WRITE CONTENT */}
                    {/* ========================================================= */}
                    {step === 'content' && (
                        <div className="flex flex-col gap-6 animate-in fade-in duration-300 w-full flex-1 min-h-[750px]">
                            <Card
                                shadow="sm"
                                radius="lg"
                                className="border-l-4 border-l-secondary shrink-0"
                            >
                                <CardBody className="flex-row items-center justify-between p-5">
                                    <div>
                                        <p className="text-xs font-semibold text-default-500 uppercase tracking-wider mb-1">
                                            Writing content for
                                        </p>
                                        <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                                            {formData.translations[activeLang]
                                                .title || 'Untitled Service'}
                                            <Chip
                                                size="sm"
                                                variant="flat"
                                                color="default"
                                            >
                                                /
                                                {formData.translations[
                                                    activeLang
                                                ].slug || 'no-slug'}
                                            </Chip>
                                        </h3>
                                    </div>
                                    <Button
                                        variant="light"
                                        color="secondary"
                                        onClick={() => setStep('general')}
                                    >
                                        Edit General Info
                                    </Button>
                                </CardBody>
                            </Card>

                            <Card
                                shadow="sm"
                                radius="lg"
                                className="flex-1 flex flex-col overflow-hidden border-none min-h-[600px]"
                            >
                                <div className="flex-1 overflow-hidden flex flex-col bg-white">
                                    <RichTextEditor
                                        value={
                                            formData.translations[activeLang]
                                                .content
                                        }
                                        onChange={(htmlValue) =>
                                            handleTranslationChange(
                                                'content',
                                                htmlValue
                                            )
                                        }
                                    />
                                </div>
                                <div className="border-t border-divider p-5 bg-default-50 flex items-center justify-between shrink-0">
                                    <div className="text-sm font-medium text-default-500 flex items-center gap-2">
                                        <CheckCircle2
                                            size={16}
                                            className="text-success"
                                        />{' '}
                                        Auto-saved locally
                                    </div>
                                    <Button
                                        type="submit"
                                        color="secondary"
                                        size="lg"
                                        radius="lg"
                                        className="font-medium shadow-md shadow-secondary/20 px-10"
                                        isLoading={isPending}
                                    >
                                        {isPending
                                            ? 'Publishing...'
                                            : mode === 'edit'
                                              ? 'Update Service'
                                              : 'Publish Service'}
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    )}
                </form>
            </AdminPageBody>
        </AdminPageContainer>
    )
}
